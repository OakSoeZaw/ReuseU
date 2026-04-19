package com.reuseu.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imagePath;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ItemStatus status = ItemStatus.AVAILABLE;

    @Column(nullable = false, updatable = false)
    private LocalDateTime postedAt;

    @Column(nullable = false, updatable = true)
    private LocalDateTime updatedAt;

    @Column(nullable = false, updatable = false)
    private Long postedById;

    @Column
    private Long claimedById;

    public Item() {
    }

    public Item(String title, String description, String imagePath, Long postedById) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.postedById = postedById;
        this.status = ItemStatus.AVAILABLE;
    }

    @PrePersist
    protected void onCreate() {
        this.postedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // getter and setters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Long getPostedById() {
        return postedById;
    }

    public Long getClaimedById() {
        return claimedById;
    }

    public void setClaimedById(Long claimedById) {
        this.claimedById = claimedById;
    }

}
