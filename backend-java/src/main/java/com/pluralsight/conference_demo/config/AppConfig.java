package com.pluralsight.conference_demo.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("My API")
                        .version("1.0")
                        .description("This is a sample Spring Boot 3 API using OpenAPI documentation."));
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
