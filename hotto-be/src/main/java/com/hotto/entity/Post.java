package com.hotto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String password;
    private String ipAddress;
    private String title;
    private String content;
    @Column(columnDefinition = "int default 0")
    private int likes;

    @Column(columnDefinition = "int default 0")
    private int views;

    @Column(columnDefinition = "int default 0")
    private int commentCount;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostTag> postTags;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    public void addLike() {
        this.likes++;
    }

    public void addView() {
        this.views++;
    }

    public void addComment() {
        this.commentCount++;
    }
}
