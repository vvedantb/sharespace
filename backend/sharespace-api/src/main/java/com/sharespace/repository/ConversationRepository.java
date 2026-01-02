package com.sharespace.repository;

import com.sharespace.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    @Query("SELECT c FROM Conversation c WHERE c.participant1.id = :userId OR c.participant2.id = :userId ORDER BY c.createdAt DESC")
    List<Conversation> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT c FROM Conversation c WHERE " +
           "(c.participant1.id = :user1 AND c.participant2.id = :user2) OR " +
           "(c.participant1.id = :user2 AND c.participant2.id = :user1)")
    Optional<Conversation> findByParticipants(@Param("user1") UUID user1, @Param("user2") UUID user2);

    @Query("SELECT c FROM Conversation c WHERE c.item.id = :itemId AND " +
           "((c.participant1.id = :user1 AND c.participant2.id = :user2) OR " +
           "(c.participant1.id = :user2 AND c.participant2.id = :user1))")
    Optional<Conversation> findByParticipantsAndItem(@Param("user1") UUID user1, @Param("user2") UUID user2, @Param("itemId") UUID itemId);
}
