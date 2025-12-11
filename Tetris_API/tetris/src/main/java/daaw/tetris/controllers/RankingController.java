package daaw.tetris.controllers;

import daaw.tetris.persistence.model.Score;
import daaw.tetris.persistence.repo.ScoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RankingController {

    private final ScoreRepository scoreRepository;

    public RankingController(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<Score>> getRanking() {
        return ResponseEntity.ok(scoreRepository.findTop10ByOrderByTotalLinesDesc());
    }

    @PostMapping("/ranking")
    public ResponseEntity<Score> addScore(@RequestBody Score score) {
        Score savedScore = scoreRepository.save(score);
        return ResponseEntity.ok(savedScore);
    }
}