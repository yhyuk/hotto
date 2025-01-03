package com.hotto.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String ipAddress;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    protected Comment() {
        // JPA 기본 생성자
    }

    public Comment(Post post, String nickname, String ipAddress, String content) {
        this.post = post;
        this.nickname = nickname;
        this.ipAddress = ipAddress;
        this.content = content;
    }

    // Getters and setters...
}

