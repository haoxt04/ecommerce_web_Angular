package com.project.shopapp.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapp.utils.PhoneNumber;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginDTO {
    @JsonProperty("phone_number")
    @PhoneNumber(message = "phone invalid format")
    private String phoneNumber;

    @NotNull(message = "password must be not null")
    private String password;
}
