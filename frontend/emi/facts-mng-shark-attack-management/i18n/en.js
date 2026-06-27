export default {
  navigation: {
    'settings': 'Settings',
    'facts-mng-shark-attack-management': 'SharkAttacks',
  },
  shark_attacks: {
    shark_attacks: 'SharkAttacks',
    search: 'Quick search by name',
    add_new_shark_attack: 'ADD NEW',
    add_new_shark_attack_short: 'NEW',
    more_cases: 'More Cases',
    rows_per_page: 'Rows per page:',
    of: 'of',
    remove: 'Remove',
    table_colums: {
      name: 'Name',
      active: 'Active',
      country: 'Country',
      date: 'Date',
      type: 'Type',
      species: 'Species'
    },
    remove_dialog_title: "Do you want to delete the selected SharkAttacks??",
    remove_dialog_description: "This action can not be undone",
    remove_dialog_no: "No",
    remove_dialog_yes: "Yes",
    filters: {
      title: "Filters",
      active: "Active"
    }
  },
  shark_attack: {
    shark_attacks: 'SharkAttacks',
    shark_attack_detail: 'SharkAttack detail',
    save: 'SAVE',
    basic_info: 'Basic Info',
    name: 'Name',
    description: 'Description',
    year: 'Year',
    age: 'Age',
    type: 'Type',
    country: 'Country',
    area: 'Area',
    location: 'Location',
    activity: 'Activity',
    sex: 'Sex',
    injury: 'Injury',
    fatal_y_n: 'Fatal',
    time: 'Time',
    species: 'Species',
    investigator_or_source: 'Investigator or Source',
    pdf: 'PDF',
    href_formula: 'Link Formula',
    href: 'Link',
    case_number: 'Case Number',
    case_number0: 'Case Number 0',
    active: 'Active',
    metadata_tab: 'Metadata',
    metadata: {
      createdBy: 'Created by',
      createdAt: 'Created at',
      updatedBy: 'Modified by',
      updatedAt: 'Modified at',
    },
    not_found: 'Sorry but we could not find the entity you are looking for',
    internal_server_error: 'Internal Server Error',
    update_success: 'SharkAttack has been updated',
    create_success: 'SharkAttack has been created',
    form_validations: {
      name: {
        length: "Name must be at least {len} characters",
        required: "Name is required",
      },
      date: {
        required: "Date is required"
      },
      year: {
        required: "Year is required"
      },
      age: {
        required: "Age is required"
      },
      type: {
        required: "Type is required"
      },
      country: {
        required: "Country is required"
      },
      area: {
        required: "Area is required"
      },
      location: {
        required: "Location is required"
      },
      activity: {
        required: "Activity is required"
      },
      sex: {
        required: "Sex is required"
      },
      injury: {
        required: "Injury is required"
      },
      fatal_y_n: {
        required: "Fatal field is required"
      },
      time: {
        required: "Time is required"
      },
      species: {
        required: "Species is required"
      },
      investigator_or_source: {
        required: "Investigator or Source is required"
      },
      pdf: {
        required: "PDF is required"
      },
      href_formula: {
        required: "Link formula is required"
      },
      href: {
        required: "Link is required"
      },
      case_number: {
        required: "Case number is required"
      },
    }
  }
};