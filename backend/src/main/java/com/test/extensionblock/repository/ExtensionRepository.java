package com.test.extensionblock.repository;

import com.test.extensionblock.entity.Extension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtensionRepository extends JpaRepository<Extension, Long> {
    Extension findByExtensionName(String extensionName);

    Long countByType(String type);
}
