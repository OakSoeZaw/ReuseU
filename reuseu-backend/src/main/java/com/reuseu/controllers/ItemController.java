package com.reuseu.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.reuseu.services.*;
import com.reuseu.model.*;
import java.util.Optional;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<?> getItems(){
        List<Item> availableItems = itemService.getAvailableItems();
        return ResponseEntity.ok(availableItems);
    }

    @PostMapping
    public ResponseEntity<?> postItem(
        @RequestParam String title,
        @RequestParam String description,
        @RequestParam Long postedById,
        @RequestParam MultipartFile image){
            String imagePath = "uploads/" + image.getOriginalFilename();
            try{
                Item item = itemService.postItem(title, description, imagePath, postedById);
                return ResponseEntity.ok(item);
            } catch(Exception e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
    

    @PutMapping("/{id}/claim")
    public ResponseEntity<?> claimItem(@PathVariable Long id, @RequestBody Map<String, Long> body){
        Long claimedId = body.get("claimedById");
        try{
            Item item = itemService.claimItem(id, claimedId);
            return ResponseEntity.ok(item);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmPickup(@PathVariable Long id){
        try{
            Item item = itemService.confirmPickup(id);
            return ResponseEntity.ok(item);
        }catch( Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}
