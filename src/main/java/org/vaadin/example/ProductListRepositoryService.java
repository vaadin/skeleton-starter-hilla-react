package org.vaadin.example;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class ProductListRepositoryService extends ListRepositoryService<Product, Long, ProductRepository> {

    public void deleteProduct(Long productId) {
        getRepository().deleteById(productId);
    }
}