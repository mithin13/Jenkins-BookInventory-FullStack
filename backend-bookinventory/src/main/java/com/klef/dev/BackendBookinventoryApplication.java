package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackendBookinventoryApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BackendBookinventoryApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendBookinventoryApplication.class, args);
        System.out.println("Book Inventory Backend is Running...");
    }
}