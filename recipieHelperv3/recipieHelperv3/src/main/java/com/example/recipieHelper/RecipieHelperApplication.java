package com.example.recipieHelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.system.JavaVersion;
import org.springframework.core.SpringVersion;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories()
public class RecipieHelperApplication {


	public static void main(String[] args) {
		SpringApplication.run(RecipieHelperApplication.class, args);
	}

}
