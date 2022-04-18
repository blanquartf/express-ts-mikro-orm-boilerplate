import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const swaggerFile = routingControllersToSpec(
  getMetadataArgsStorage(),
  { routePrefix: '/api/v1' },
  {
    components: {
      schemas,
    },
  }
);

export default swaggerFile;
