package com.project.shopapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class Product {
    @NotNull(message = "product name must be not null")
    private String name;

    @Min(value = 0, message = "product price must be greater than or equal to 0")
    private float price;

    private String thumbnail;

    private String description;

    @JsonProperty("category_id")
    private String categoryId;

    @NotEmpty(message = "files of product must be not empty")
    private List<MultipartFile> files;

}
