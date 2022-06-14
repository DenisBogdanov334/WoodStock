using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecificationParameters productSpecificationParameters)
        : base(x =>
            (string.IsNullOrEmpty(productSpecificationParameters.Search) || x.Name.ToLower().Contains(productSpecificationParameters.Search)) &&
            (!productSpecificationParameters.BrandId.HasValue || x.ProductBrandId == productSpecificationParameters.BrandId) &&
            (!productSpecificationParameters.TypeId.HasValue || x.ProductTypeId == productSpecificationParameters.TypeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productSpecificationParameters.PageSize * (productSpecificationParameters.PageIndex - 1), 
                        productSpecificationParameters.PageSize);

            if (!string.IsNullOrEmpty(productSpecificationParameters.Sort))
            {
                switch (productSpecificationParameters.Sort)
                {
                    case "priceAscending":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDescending":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }
        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}