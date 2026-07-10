import { gql } from 'apollo-boost';

export const FactsMngSharkAttackListing = (variables) => ({
    query: gql`
            query FactsMngSharkAttackListing($filterInput:FactsMngSharkAttackFilterInput ,$paginationInput:FactsMngSharkAttackPaginationInput,$sortInput:FactsMngSharkAttackSortInput){
                FactsMngSharkAttackListing(filterInput:$filterInput,paginationInput:$paginationInput,sortInput:$sortInput){
                    listing{
                       id,name,active,date,country,type,species
                    },
                    queryTotalResultCount
                }
            }`,
    variables,
    fetchPolicy: 'network-only',
})

export const FactsMngSharkAttack = (variables) => ({
    query: gql`
            query FactsMngSharkAttack($id: ID!, $organizationId: String!){
                FactsMngSharkAttack(id:$id, organizationId:$organizationId){
                    id,name,description,date,year,type,country,location,area,activity,sex,age,injury,fatal_y_n,time,species,investigator_or_source, pdf,href_formula,href,case_number,case_number0,active,organizationId,  
                    metadata{ createdBy, createdAt, updatedBy, updatedAt }
                }
            }`,
    variables,
    fetchPolicy: 'network-only',
})


export const FactsMngRelatedSharkAttacks = (variables) => ({
    query: gql`
        query FactsMngRelatedSharkAttacks($country: String!) {
            FactsMngRelatedSharkAttacks(country: $country) {
                name
                country
                date
                type
                species
            }
        }
    `,
    variables,
    fetchPolicy: 'network-only',
});


export const FactsMngCreateSharkAttack = (variables) => ({
    mutation: gql`
            mutation  FactsMngCreateSharkAttack($input: FactsMngSharkAttackInput!){
                FactsMngCreateSharkAttack(input: $input){
                    id,name,description,date,year,type,country,location,area,activity,sex,age,injury,fatal_y_n,time,species,investigator_or_source, pdf,href_formula,href,case_number,case_number0,active,organizationId,
                    metadata{ createdBy, createdAt, updatedBy, updatedAt }
                }
            }`,
    variables
})

export const FactsMngDeleteSharkAttack = (variables) => ({
    mutation: gql`
            mutation FactsMngSharkAttackListing($ids: [ID]!){
                FactsMngDeleteSharkAttacks(ids: $ids){
                    code,message
                }
            }`,
    variables
})

export const FactsMngUpdateSharkAttack = (variables) => ({
    mutation: gql`
            mutation FactsMngUpdateSharkAttack($id: ID!,$input: FactsMngSharkAttackInput!, $merge: Boolean!){
                FactsMngUpdateSharkAttack(id:$id, input: $input, merge:$merge ){
                    id,organizationId,name,description,date,year,type,country,location,area,activity,sex,age,injury,fatal_y_n,time,species,investigator_or_source,pdf,href_formula,href,case_number,case_number0,active
                }
            }`,
    variables
})

export const onFactsMngSharkAttackModified = (variables) => ([
    gql`subscription onFactsMngSharkAttackModified($id:ID!){
            FactsMngSharkAttackModified(id:$id){    
                id,organizationId,name,description,date,year,type,country,location,area,activity,sex,age,injury,fatal_y_n,time,species,investigator_or_source, pdf,href_formula,href,case_number,case_number0,active
                metadata{ createdBy, createdAt, updatedBy, updatedAt }
            }
    }`,
    { variables }
])

export const FactsMngImportSharkAttacks = (variables) => ({
    mutation: gql`
        mutation FactsMngImportSharkAttacks {
            FactsMngImportSharkAttacks {
                code
                message
            }
        }
    `,
    variables
});

export const FactsMngSharkAttackDashboard = (variables) => ({
    query: gql`
        query FactsMngSharkAttackDashboard {
            FactsMngSharkAttackDashboard {
                total
                attacksByCountry {
                    country
                    count
                }
                attacksByYear {
                    year
                    count
                }
            }
        }
    `,
    variables,
    fetchPolicy: 'network-only'
});