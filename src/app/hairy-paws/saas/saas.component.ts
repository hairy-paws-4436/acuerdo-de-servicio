import { Component, OnInit, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./saas.component.css']
})
export class SaasComponent implements OnInit, AfterViewInit {
  currentSection: string = 'introduccion';
  showBackToTop: boolean = false;
  email:string = 'legal@hairypaws.com.pe';
  constructor(
    private renderer: Renderer2,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Términos y Condiciones | Hairy Paws');
    const fontAwesome = this.renderer.createElement('link');
    this.renderer.setAttribute(fontAwesome, 'rel', 'stylesheet');
    this.renderer.setAttribute(fontAwesome, 'href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
    this.renderer.appendChild(document.head, fontAwesome);
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      this.currentSection = hash;
      setTimeout(() => {
        this.scrollToSection(hash);
      }, 300);
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        this.currentSection = hash;
        this.updateActiveLink(hash);
      }
    });
    this.updateActiveLink(this.currentSection);
    this.animateSections();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTop = scrollPosition > 600;
    this.updateActiveSection();
    this.animateSections();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.currentSection = sectionId;
      this.updateActiveLink(sectionId);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateActiveSection(): void {
    const sections = document.querySelectorAll('.terms-section');

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        const id = section.id;
        if (id !== this.currentSection) {
          this.currentSection = id;
          history.replaceState(null, '', `#${id}`);
          this.updateActiveLink(id);
        }
        break;
      }
    }
  }

  private updateActiveLink(activeId: string): void {
    const links = document.querySelectorAll('.terms-toc a');
    links.forEach(link => {
      this.renderer.removeClass(link, 'active');
    });
    const activeLink = document.querySelector(`.terms-toc a[href="#${activeId}"]`);
    if (activeLink) {
      this.renderer.addClass(activeLink, 'active');
    }
  }

  private animateSections(): void {
    const sections = document.querySelectorAll('.terms-section');
    // @ts-ignore
    sections.forEach((section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100) {
        this.renderer.addClass(section, 'animated');
      }
    });
  }
}
