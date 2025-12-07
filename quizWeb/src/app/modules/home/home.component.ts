import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

interface StatBadge {
  number: string;
  label: string;
  position: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // About Section Data
  statBadges: StatBadge[] = [
    { number: '50K+', label: 'Users', position: 'badge-1' },
    { number: '2K+', label: 'Quizzes', position: 'badge-2' }
  ];

  featureCards: FeatureCard[] = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'Make learning interactive, enjoyable, and accessible to everyone.',
      colorClass: 'card-mission'
    },
    {
      icon: '🚀',
      title: 'Our Vision',
      description: 'Gamify education and empower learners worldwide.',
      colorClass: 'card-vision'
    },
    {
      icon: '🏆',
      title: 'Our Values',
      description: 'Motivation, collaboration, and continuous growth.',
      colorClass: 'card-values'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.reveal);
    this.reveal();
  }

  ngOnDestroy(): void {
    // Clean up event listener to prevent memory leaks
    window.removeEventListener('scroll', this.reveal);
  }

  reveal() {
    const elements: any = document.querySelectorAll('.reveal');
    elements.forEach((el: HTMLElement) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // About Section Methods
  onExploreQuizzes(): void {
    // Navigate to quizzes/browse page
    this.router.navigate(['/quizzes']);
    // Or scroll to features section if on same page
    // this.scrollToSection('features');
  }

  onLearnMore(): void {
    // Navigate to about page or open modal
    this.router.navigate(['/about']);
    // Or scroll to specific section
    // this.scrollToSection('features');
  }

  // Optional: Smooth scroll helper method
  private scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}