package com.ecommerce.project.service;

import com.ecommerce.project.entity.Cart;
import com.ecommerce.project.entity.Category;
import com.ecommerce.project.entity.Product;
import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repository.CartRepository;
import com.ecommerce.project.repository.CategoryRepository;
import com.ecommerce.project.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FileService fileService;
    @Value("${project.image}")
    private String path;

    @Override
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
        Category category=categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category","categoryId",categoryId)
        );
        boolean isProductNotPresent =true;
        List<Product> products= category.getProducts();
        for (Product value : products) {
            if (value.getProductName().equalsIgnoreCase(productDTO.getProductName())) {
                isProductNotPresent = false;
                break;
            }
        }
        if (isProductNotPresent) {
            Product product = modelMapper.map(productDTO, Product.class);
            product.setImage(product.getImage() != null ? product.getImage() : "default.png");
            product.setCategory(category);
            double specialPrice = product.getPrice() - ((product.getDiscount() / 100) * product.getPrice());
            specialPrice = Math.round(specialPrice * 100.0) / 100.0;
            product.setSpecialPrice(specialPrice);
            Product savedProduct = productRepository.save(product);
            return modelMapper.map(savedProduct, ProductDTO.class);
        }else {
            throw new APIException("Product already exists");
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> pageProducts = productRepository.findAll(pageDetails);
        List<Product> products = pageProducts.getContent();
        List<ProductDTO> productDTOList = products.stream().map(
                product -> modelMapper.map(product, ProductDTO.class)
        ).toList();
        if (products.isEmpty()) {
            throw new APIException("No products found");
        }

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOList);
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductResponse searchByCategories(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category", "categoryId", categoryId)
        );
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> pageProducts = productRepository.findByCategoryOrderByPriceAsc(category,pageDetails);
        List<Product> products = pageProducts.getContent();
        List<ProductDTO> productDTOList = products.stream().map
                (product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
        if (products.isEmpty()) {
            throw new APIException("No products found");
        }

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOList);
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;

    }

    @Override
    public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> pageProducts = productRepository.findByProductNameContainingIgnoreCase(keyword,pageDetails);
        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOList = products.stream().map
                        (product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());

        if (products.isEmpty()) {
            throw new APIException("No products found with keyword " + keyword);
        }
        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOList);
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product updateproduct = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId)
        );
        Product product =modelMapper.map(productDTO, Product.class);
        updateproduct.setProductName(product.getProductName());
        updateproduct.setDescription(product.getDescription());
        updateproduct.setPrice(product.getPrice());
        updateproduct.setDiscount(product.getDiscount());
        Category category = categoryRepository.findById(product.getCategory().getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", product.getCategory().getCategoryId()));
        updateproduct.setCategory(category);
        double specialPrice = product.getPrice() - ((product.getDiscount() / 100) * product.getPrice());
        specialPrice = Math.round(specialPrice * 100.0) / 100.0;
        updateproduct.setSpecialPrice(specialPrice);
        Product saved = productRepository.save(updateproduct);

        List<Cart> carts =cartRepository.findCartByProductId(productId);

        List<CartDTO> cartDTOS= carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            List<ProductDTO> productDTOList=cart.getCartItems().stream().map(
                    p-> modelMapper.map(p.getProduct(),ProductDTO.class)
            ).collect(Collectors.toList());
            cartDTO.setProducts(productDTOList);
            return cartDTO;
        }).toList();

        cartDTOS.forEach(cart -> cartService.updateProductInCarts(cart.getCartId(),productId));
        return modelMapper.map(saved, ProductDTO.class);

    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId)
        );
        List<Cart> carts =cartRepository.findCartByProductId(productId);
        carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(),productId));

        productRepository.delete(product);
        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
       Product productFromDb =  productRepository.findById(productId).orElseThrow(
               ()-> new ResourceNotFoundException("Product","productId",productId)
       );
        String filename = fileService.uploadImage(path,image);
        productFromDb.setImage(filename);
        Product saved = productRepository.save(productFromDb);
        return modelMapper.map(saved, ProductDTO.class);
    }
}