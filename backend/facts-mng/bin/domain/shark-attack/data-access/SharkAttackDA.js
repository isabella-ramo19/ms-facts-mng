"use strict";

let mongoDB = undefined;
const { map, mapTo, tap, mergeMap  } = require("rxjs/operators");
const { of, Observable, iif, defer, from, forkJoin} = require("rxjs");

const { CustomError } = require("@nebulae/backend-node-tools").error;

const CollectionName = 'SharkAttack';

class SharkAttackDA {
  static start$(mongoDbInstance) {
    return Observable.create(observer => {
      if (mongoDbInstance) {
        mongoDB = mongoDbInstance;
        observer.next(`${this.name} using given mongo instance`);
      } else {
        mongoDB = require("../../../tools/mongo-db/MongoDB").singleton();
        observer.next(`${this.name} using singleton system-wide mongo instance`);
      }
      observer.next(`${this.name} started`);
      observer.complete();
    });
  }

  

  static generateListingQuery(filter) {
    const query = {};
    if (filter.name) {
      query["name"] = { $regex: filter.name, $options: "i" };
    }
    if (filter.organizationId) {
      query["organizationId"] = filter.organizationId;
    }
    if (filter.active !== undefined) {
      query["active"] = filter.active;
    }

    return query;
  }

  static getSharkAttackList$(filter = {}, pagination = {}, sortInput) {
    const collection = mongoDB.db.collection(CollectionName);
    const { page = 0, count = 10 } = pagination;

    const query = this.generateListingQuery(filter);    
    const projection = {
      name: 1,
      description: 1,
      active: 1,
      date: 1,
      year: 1,
      type: 1,
      country: 1,
      area: 1,
      location: 1,
      activity: 1,
      sex: 1,
      age: 1,
      injury: 1,
      fatal_y_n: 1,
      time: 1,
      species: 1,
      investigator_or_source: 1,
      pdf: 1,
      href_formula: 1,
      href: 1,
      case_number: 1,
      case_number0: 1
    };

    let cursor = collection
      .find(query, { projection })
      .skip(count * page)
      .limit(count);

    const sort = {};
    if (sortInput) {
      sort[sortInput.field] = sortInput.asc ? 1 : -1;
    } else {
      sort["metadata.createdAt"] = -1;
    }
    cursor = cursor.sort(sort);


    return mongoDB.extractAllFromMongoCursor$(cursor).pipe(
      map(res => {
        return { ...res, id: res._id };
      })
    );
  }

  static getSharkAttackSize$(filter = {}) {
    const collection = mongoDB.db.collection(CollectionName);
    const query = this.generateListingQuery(filter);    
    return defer(() => collection.countDocuments(query));
  }



  /**
 * Obtiene un SharkAttack por id
 */
  static getSharkAttack$(_id) {
    const collection = mongoDB.db.collection(CollectionName);

    return defer(() =>
      collection.findOne({ _id })
    ).pipe(
      map(result =>
        result
          ? { ...result, id: result._id }
          : null
      )
    );
  }

  /**
  * creates a new SharkAttack 
  * @param {*} id SharkAttack ID
  * @param {*} SharkAttack properties
  */
  static createSharkAttack$(_id, properties, createdBy) {

    const metadata = { createdBy, createdAt: Date.now(), updatedBy: createdBy, updatedAt: Date.now() };
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() => collection.insertOne({
      _id,
      ...properties,
      metadata,
    })).pipe(
      map(({ insertedId }) => ({ id: insertedId, ...properties, metadata }))
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static updateSharkAttack$(_id, properties, updatedBy) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.findOneAndUpdate(
        { _id },
        {
          $set: {
            ...properties,
            "metadata.updatedBy": updatedBy, "metadata.updatedAt": Date.now()
          }
        },
        {
          returnOriginal: false,
        }
      )
    ).pipe(
      map(result => result && result.value ? { ...result.value, id: result.value._id } : undefined)
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static updateSharkAttackFromRecovery$(_id, properties, av) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.updateOne(
        {
          _id,
        },
        { $set: { ...properties } },
        {
          returnOriginal: false,
          upsert: true
        }
      )
    ).pipe(
      map(result => result && result.value ? { ...result.value, id: result.value._id } : undefined)
    );
  }

  /**
  * modifies the SharkAttack properties
  * @param {String} id  SharkAttack ID
  * @param {*} SharkAttack properties to update
  */
  static replaceSharkAttack$(_id, properties) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.replaceOne(
        { _id },
        properties,
      )
    ).pipe(
      mapTo({ id: _id, ...properties })
    );
  }

  /**
    * deletes an SharkAttack 
    * @param {*} _id  SharkAttack ID
  */
  static deleteSharkAttack$(_id) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.deleteOne({ _id })
    );
  }

  /**
    * deletes multiple SharkAttack at once
    * @param {*} _ids  SharkAttack IDs array
  */
  static deleteSharkAttacks$(_ids) {
    const collection = mongoDB.db.collection(CollectionName);
    return defer(() =>
      collection.deleteMany({ _id: { $in: _ids } })
    ).pipe(
      map(({ deletedCount }) => deletedCount > 0)
    );
  }

static getDashboardStats$() {
  const collection = mongoDB.db.collection(CollectionName);

  const total$ = from(
    collection.countDocuments({ active: true })
  );

  const byCountry$ = from(
    collection.aggregate([
      {
        $match: { active: true }
      },
      {
        $group: {
          _id: "$country",
          total: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 5
      }
    ]).toArray()
  );

  const byYear$ = from(
    collection.aggregate([
      {
        $match: { active: true }
      },
      {
        $group: {
          _id: "$year",
          total: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray()
  );

  return forkJoin({
    total: total$,
    attacksByCountry: byCountry$,
    attacksByYear: byYear$
  }).pipe(
    map(result => ({
      total: result.total,
      attacksByCountry: result.attacksByCountry.map(c => ({
        country: c._id,
        count: c.total
      })),
      attacksByYear: result.attacksByYear.map(y => ({
        year: y._id,
        count: y.total
      }))
    }))
  );
}

}
/**
 * @returns {SharkAttackDA}
 */
module.exports = SharkAttackDA;
