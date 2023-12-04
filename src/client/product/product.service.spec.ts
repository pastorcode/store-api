import { ProductController } from './product.controller';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(() => {
    productController = new ProductController();
  });

  describe('greeting', () => {
    it('should return Hello World!!!', () => {
      expect(productController.greeting()).toBe('Hello World!!!');
    });
  });
});

