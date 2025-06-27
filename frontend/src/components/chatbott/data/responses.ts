import { PredefinedResponse } from '../types/chat';

export const predefinedResponses: PredefinedResponse[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings'],
    response: 'Hello! Are you a tenant looking for support or an agent interested in listing properties?'
  },
  {
    keywords: ['tenant', 'renter'],
    response: 'As a tenant, I can help you with:\n1. Maintenance requests\n2. Rent payments\n3. Lease questions\n4. Property issues\n\nWhat would you like assistance with?'
  },
  {
    keywords: ['agent', 'broker', 'realtor'],
    response: 'As an agent, I can assist you with:\n1. Listing properties\n2. Managing viewings\n3. Client inquiries\n4. Commission details\n\nWhat specific information do you need?'
  },
  {
    keywords: ['maintenance', 'repair', 'fix', 'broken'],
    response: "I'll connect you with our maintenance support team. Please provide:\n1. Your property address\n2. Description of the issue\n3. Best time to contact you"
  },
  {
    keywords: ['rent', 'payment', 'pay', 'due'],
    response: "For rent-related queries, please specify:\n1. Your property address\n2. Payment date in question\n3. Any specific payment issues\n\nI'll connect you with our tenant support team."
  },
  {
    keywords: ['lease', 'contract', 'agreement'],
    response: "For lease-related questions, please provide:\n1. Your property address\n2. Specific lease concern\n3. Lease start date\n\nI'll connect you with our leasing specialist."
  },
  {
    keywords: ['list', 'sell', 'property'],
    response: "To list a property, please share:\n1. Property address\n2. Property type\n3. Number of bedrooms/bathrooms\n4. Expected price range\n\nI'll connect you with our listing specialist."
  },
  {
    keywords: ['viewing', 'show', 'tour'],
    response: "To schedule a viewing, please provide:\n1. Property address or listing ID\n2. Preferred date and time\n3. Your contact information\n\nI'll connect you with our showing coordinator."
  },
  {
    keywords: ['commission', 'fee', 'charge'],
    response: "For commission-related inquiries, please specify:\n1. Property type\n2. Expected sale price\n3. Your brokerage details\n\nI'll connect you with our agent support team."
  }
];

export const userTypeResponses = {
  tenant: [
    'maintenance',
    'rent',
    'lease',
    'repair',
    'payment',
    'issue'
  ],
  agent: [
    'list',
    'sell',
    'commission',
    'showing',
    'client',
    'property'
  ]
};