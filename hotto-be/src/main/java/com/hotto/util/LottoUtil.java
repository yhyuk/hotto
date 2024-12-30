package com.hotto.util;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class LottoUtil {

    public static int calculateCurrentDrawNumber(LocalDate targetDate) {
        // 로또 1회차 날짜: 2002년 12월 7일
        LocalDate firstDrawDate = LocalDate.of(2002, 12, 7);

        // 주어진 날짜가 몇 주(회차) 지났는지 계산
        long weeksBetween = ChronoUnit.WEEKS.between(firstDrawDate, targetDate);

        // 1회차를 기준으로 회차 계산
        return (int) weeksBetween + 1;
    }
}
