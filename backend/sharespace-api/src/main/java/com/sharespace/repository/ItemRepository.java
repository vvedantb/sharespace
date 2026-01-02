package com.sharespace.repository;

import com.sharespace.model.Item;
import com.sharespace.model.enums.Category;
import com.sharespace.model.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
    List<Item> findBySellerIdOrderByCreatedAtDesc(UUID sellerId);
    List<Item> findByStatusOrderByCreatedAtDesc(ItemStatus status);
    List<Item> findByCategoryAndStatusOrderByCreatedAtDesc(Category category, ItemStatus status);

    @Query("SELECT i FROM Item i WHERE i.status = :status AND " +
           "(LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Item> searchItems(@Param("search") String search, @Param("status") ItemStatus status);

    @Query("SELECT i FROM Item i WHERE i.status = :status AND i.category = :category AND " +
           "(LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Item> searchItemsByCategory(@Param("search") String search, @Param("category") Category category, @Param("status") ItemStatus status);

    long countBySellerIdAndStatus(UUID sellerId, ItemStatus status);
}
