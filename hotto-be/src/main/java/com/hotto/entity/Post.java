package com.hotto.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String ipAddress;
    private String title;
    private String content;
    private int likes;
    private int views;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    protected Post() {
        // JPA 기본 생성자
    }

    public Post(String nickname, String ipAddress, String title, String content) {
        this.nickname = nickname;
        this.ipAddress = ipAddress;
        this.title = title;
        this.content = content;
        this.likes = 0;
        this.views = 0;
    }

    // Getters and setters...
    public void addLike() {
        this.likes++;
    }
}
