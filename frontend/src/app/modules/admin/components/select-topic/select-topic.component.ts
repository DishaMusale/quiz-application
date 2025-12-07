import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'; // ✅ import structural directives
import { TitleCasePipe } from '@angular/common'; // ✅ import pipe

interface Topic {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-select-topic',
  standalone: true, // ✅ mark as standalone
  imports: [NgFor, NgIf, TitleCasePipe], // ✅ required for template
  templateUrl: './select-topic.component.html',
  styleUrls: ['./select-topic.component.scss'],
})
export class SelectTopicComponent implements OnInit {
  level: string = '';
  topics: Topic[] = [];

  // ✅ Topics grouped by level
  // ✅ Topics grouped by level
allTopics: Record<string, Topic[]> = {
  beginner: [
    { id: 1, name: 'Arrays', description: 'Basic array operations' },
    { id: 2, name: 'Linked List', description: 'Pointer-based structure' },
    { id: 9, name: 'Strings', description: 'String manipulation and operations' },
    { id: 10, name: 'Sorting', description: 'Basic sorting algorithms like Bubble, Insertion, Selection' },
  ],
  intermediate: [
    { id: 3, name: 'Stacks & Queues', description: 'LIFO and FIFO' },
    { id: 4, name: 'Trees', description: 'Binary tree & traversal' },
    { id: 5, name: 'Graphs', description: 'BFS, DFS, and graph traversal' },
    { id: 11, name: 'Heaps', description: 'Heap data structure and priority queues' },
    { id: 12, name: 'Searching Algorithms', description: 'Binary search, linear search, and variations' },
  ],
  senior: [
    { id: 6, name: 'Hashing', description: 'Hash tables and collision handling' },
    { id: 7, name: 'Recursion & Backtracking', description: 'Solve problems using recursion' },
    { id: 8, name: 'Dynamic Programming', description: 'Optimal substructure and memoization' },
    { id: 13, name: 'Greedy Algorithms', description: 'Optimization problems solved with greedy approach' },
    { id: 14, name: 'Graph Algorithms', description: 'Advanced algorithms like Dijkstra, Kruskal, Prim' },
  ]
};


  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ✅ Read the level from the route param (/admin/select-topic/:level)
    this.level = this.route.snapshot.paramMap.get('level')?.toLowerCase() || '';

    // ✅ Load topics based on level
    this.topics = this.allTopics[this.level] || [];
    console.log('Loaded topics for level:', this.level, this.topics);
  }

  openTests(topic: Topic) {
    if (!this.level) {
      console.error('No level found, cannot navigate');
      return;
    }
    const topicSlug = topic.name.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate([`/admin/add-question`, this.level, topicSlug]);
  }
}
