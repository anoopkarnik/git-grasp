import { ConnectionCardProps, ConnectionType } from "./ts-types";



export const CONNECTIONS: ConnectionCardProps[] = [
    {
      title: 'OpenAI',
      description: 'Interact with openAI API',
      logo: 'https://strapi.bayesian-labs.com/uploads/openai_dd0651e5c3.png',
      darkLogo: 'https://strapi.bayesian-labs.com/uploads/openai_dd0651e5c3.png',
      type: ConnectionType.ApiKey,
      published: true,
    }
  ]
