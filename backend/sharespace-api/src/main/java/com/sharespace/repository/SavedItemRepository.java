package com.sharespace.repository;

import com.sharespace.model.SavedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SavedItemRepository extends JpaRepository<SavedItem, UUID> {
    List<SavedItem> findByUserIdOrderByCreatedAtDesc(UUID userId);
    Optional<SavedItem> findByUserIdAndItemId(UUID userId, UUID itemId);
    boolean existsByUserIdAndItemId(UUID userId, UUID itemId);
    void deleteByUserIdAndItemId(UUID userId, UUID itemId);
}
