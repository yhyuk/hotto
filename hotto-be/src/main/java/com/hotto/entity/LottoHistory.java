package com.hotto.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public record LottoHistory (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id,
        @ElementCollection
        List<Integer> numbers,
        LocalDateTime createdAt
) {
    // ...
}
