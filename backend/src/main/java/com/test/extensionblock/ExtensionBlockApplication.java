package com.test.extensionblock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableJpaAuditing
@SpringBootApplication
public class ExtensionBlockApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExtensionBlockApplication.class, args);
	}

}
