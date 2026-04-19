package com.reuseu.services;

import com.reuseu.repository.ItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import com.reuseu.model.*;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserService userService;

    public ItemService(ItemRepository itemRepository, UserService userService) {
        this.itemRepository = itemRepository;
        this.userService = userService;
    }

    public Item postItem(String title, String description, String imagePath, Long postedById) {
        Item item = new Item(title, description, imagePath, postedById);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getClaimedItems(Long userId) {
        return itemRepository.findByClaimedById(userId);
    }

    public List<Item> getPostedItems(Long userId) {
        return itemRepository.findByPostedById(userId);
    }

    public List<Item> getAvailableItems() {
        return itemRepository.findByStatus(ItemStatus.AVAILABLE);
    }

    public Item claimItem(Long itemId, Long claimedById) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getStatus().equals(ItemStatus.AVAILABLE)) {
            throw new RuntimeException("Item is no longer available");
        }

        if (item.getPostedById().equals(claimedById)) {
            throw new RuntimeException("You cannot claim your own item");
        }

        item.setStatus(ItemStatus.CLAIMED);
        item.setClaimedById(claimedById);
        return itemRepository.save(item);
    }

    public Item confirmPickup(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getStatus().equals(ItemStatus.CLAIMED)) {
            throw new RuntimeException("Item has not been claimed yet");
        }

        item.setStatus(ItemStatus.TAKEN);
        itemRepository.save(item);

        userService.incrementGreenScore(item.getPostedById());

        return item;
    }

    public void deleteItem(Long itemId, Long requestedById) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getPostedById().equals(requestedById)) {
            throw new RuntimeException("You can only delete your own items");
        }

        itemRepository.deleteById(itemId);
    }

}
