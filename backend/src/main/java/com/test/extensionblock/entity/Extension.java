package com.test.extensionblock.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "extension")
@Getter
@Setter
@ToString
public class Extension {
    @Id
    @Column(name = "extension_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String extensionName;

    @Column(updatable = false)
    @CreatedDate
    private LocalDateTime createdDate;

    @Column
    private String type;

    public static Extension createFixedExtension(String extensionName) {
        Extension extension = new Extension();
        extension.setExtensionName(extensionName);
        extension.setType("fixed");
        return extension;
    }
    public static Extension createCustomExtension(String extensionName) {
        Extension extension = new Extension();
        extension.setExtensionName(extensionName);
        extension.setType("custom");
        return extension;
    }
}
