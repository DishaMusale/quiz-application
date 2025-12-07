import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Topic {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.scss'],
})
export class TopicSelectionComponent implements OnInit {
  level: string = '';
  topics: Topic[] = [];

  allTopics: Record<string, Topic[]> = {
    beginner: [
      { id: 1, name: 'Arrays', description: 'Basic array operations' },
      { id: 2, name: 'Linked List', description: 'Pointer-based structure' },
      { id: 9, name: 'Strings', description: 'String manipulation and operations' },
      { id: 10, name: 'Sorting', description: 'Basic sorting algorithms like Bubble, Insertion, Selection' }
    ],
    intermediate: [
      { id: 3, name: 'Stacks & Queues', description: 'LIFO and FIFO' },
      { id: 4, name: 'Trees', description: 'Binary tree & traversal' },
      { id: 5, name: 'Graphs', description: 'BFS, DFS, and graph traversal' },
      { id: 11, name: 'Heaps', description: 'Heap data structure and priority queues' },
      { id: 12, name: 'Searching Algorithms', description: 'Binary search, linear search, and variations' }
    ],
    senior: [
      { id: 6, name: 'Hashing', description: 'Hash tables and collision handling' },
      { id: 7, name: 'Recursion & Backtracking', description: 'Solve problems using recursion' },
      { id: 8, name: 'Dynamic Programming', description: 'Optimal substructure and memoization' },
      { id: 13, name: 'Greedy Algorithms', description: 'Optimization problems solved with greedy approach' },
      { id: 14, name: 'Graph Algorithms', description: 'Advanced algorithms like Dijkstra, Kruskal, Prim' }
    ]
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.level = this.route.snapshot.paramMap.get('level')?.toLowerCase() || 'beginner';

    if (!['beginner', 'intermediate', 'senior'].includes(this.level)) {
      console.warn('Invalid level:', this.level);
      this.level = 'beginner';
    }

    this.topics = this.allTopics[this.level] || [];
    console.log('Loaded topics for level:', this.level, this.topics);
  }

  // ✅ Added startQuiz method
  startQuiz(topic: Topic) {
    this.router.navigate(['/user/take-test', topic.id]);
  }
}
