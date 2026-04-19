package com.reuseu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.reuseu.model.*;

public interface ItemRepository extends JpaRepository<Item, Long>{
    List<Item> findByStatus(ItemStatus status);
    List<Item> findByPostedById(Long postedById);
    List<Item> findByClaimedById(Long claimedById);
    
}
