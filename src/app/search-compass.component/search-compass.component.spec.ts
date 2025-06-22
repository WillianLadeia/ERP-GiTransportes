// search-compass.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchCompassComponent, SearchResult } from './search-compass.component';

describe('SearchCompassComponent', () => {
  let component: SearchCompassComponent;
  let fixture: ComponentFixture<SearchCompassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCompassComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCompassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with collapsed state', () => {
    expect(component.isExpanded).toBeFalse();
    expect(component.searchQuery).toBe('');
    expect(component.filteredResults).toEqual([]);
  });

  it('should expand when compass icon is clicked', () => {
    const compassIcon = fixture.debugElement.query(By.css('.compass-icon'));
    compassIcon.nativeElement.click();
    fixture.detectChanges();

    expect(component.isExpanded).toBeTrue();
  });

  it('should close when toggle is called again', () => {
    component.toggleSearch();
    expect(component.isExpanded).toBeTrue();

    component.toggleSearch();
    expect(component.isExpanded).toBeFalse();
  });

  it('should reset search when closing', () => {
    component.searchQuery = 'test';
    component.filteredResults = [
      { id: '1', title: 'Test', description: 'Test description' }
    ];
    
    component.closeSearch();
    
    expect(component.searchQuery).toBe('');
    expect(component.filteredResults).toEqual([]);
    expect(component.isExpanded).toBeFalse();
  });

  it('should filter results based on search query', () => {
    component.searchQuery = 'dashboard';
    component.onSearchChange();

    expect(component.filteredResults.length).toBeGreaterThan(0);
    expect(component.filteredResults[0].title.toLowerCase()).toContain('dashboard');
  });

  it('should filter by title, description, and category', () => {
    // Test title search
    component.searchQuery = 'dashboard';
    component.onSearchChange();
    expect(component.filteredResults.length).toBeGreaterThan(0);

    // Test description search
    component.searchQuery = 'métricas';
    component.onSearchChange();
    expect(component.filteredResults.length).toBeGreaterThan(0);

    // Test category search
    component.searchQuery = 'navegação';
    component.onSearchChange();
    expect(component.filteredResults.length).toBeGreaterThan(0);
  });

  it('should return empty results for non-matching query', () => {
    component.searchQuery = 'xyz123nonexistent';
    component.onSearchChange();

    expect(component.filteredResults).toEqual([]);
  });

  it('should clear results when search query is empty', () => {
    component.searchQuery = 'dashboard';
    component.onSearchChange();
    expect(component.filteredResults.length).toBeGreaterThan(0);

    component.searchQuery = '';
    component.onSearchChange();
    expect(component.filteredResults).toEqual([]);
  });

  it('should emit resultSelected when result is clicked', () => {
    spyOn(component.resultSelected, 'emit');
    const mockResult: SearchResult = {
      id: '1',
      title: 'Test Result',
      description: 'Test description'
    };

    component.selectResult(mockResult);

    expect(component.resultSelected.emit).toHaveBeenCalledWith(mockResult);
    expect(component.isExpanded).toBeFalse();
  });

  it('should select first result when selectFirstResult is called', () => {
    spyOn(component, 'selectResult');
    component.filteredResults = [
      { id: '1', title: 'First Result' },
      { id: '2', title: 'Second Result' }
    ];

    component.selectFirstResult();

    expect(component.selectResult).toHaveBeenCalledWith(component.filteredResults[0]);
  });

  it('should handle keyboard navigation', () => {
    component.isExpanded = true;
    component.filteredResults = [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
      { id: '3', title: 'Result 3' }
    ];

    // Test ArrowDown
    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.onKeyDown(downEvent);
    expect(component.selectedIndex).toBe(0);

    component.onKeyDown(downEvent);
    expect(component.selectedIndex).toBe(1);

    // Test ArrowUp
    const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    component.onKeyDown(upEvent);
    expect(component.selectedIndex).toBe(0);

    component.onKeyDown(upEvent);
    expect(component.selectedIndex).toBe(-1);
  });

  it('should close search on Escape key', () => {
    component.isExpanded = true;
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    
    component.onKeyDown(escapeEvent);
    
    expect(component.isExpanded).toBeFalse();
  });

  it('should select result on Enter key when item is highlighted', () => {
    spyOn(component, 'selectResult');
    component.isExpanded = true;
    component.filteredResults = [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' }
    ];
    component.selectedIndex = 1;

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(enterEvent);

    expect(component.selectResult).toHaveBeenCalledWith(component.filteredResults[1]);
  });

  it('should add new search item', () => {
    const initialLength = component.searchItems.length;
    const newItem: SearchResult = {
      id: 'new1',
      title: 'New Item',
      description: 'New description',
      category: 'test'
    };

    component.addSearchItem(newItem);

    expect(component.searchItems.length).toBe(initialLength + 1);
    expect(component.searchItems).toContain(newItem);
  });

  it('should remove search item', () => {
    const initialLength = component.searchItems.length;
    const itemToRemove = component.searchItems[0];

    component.removeSearchItem(itemToRemove.id);

    expect(component.searchItems.length).toBe(initialLength - 1);
    expect(component.searchItems).not.toContain(itemToRemove);
  });

  it('should update search item', () => {
    const itemToUpdate = component.searchItems[0];
    const originalTitle = itemToUpdate.title;
    const updatedData = { title: 'Updated Title' };

    component.updateSearchItem(itemToUpdate.id, updatedData);

    const updatedItem = component.searchItems.find(item => item.id === itemToUpdate.id);
    expect(updatedItem?.title).toBe('Updated Title');
    expect(updatedItem?.title).not.toBe(originalTitle);
  });

  it('should display search container when expanded', () => {
    component.isExpanded = false;
    fixture.detectChanges();
    
    let searchContainer = fixture.debugElement.query(By.css('.search-container'));
    expect(searchContainer).toBeNull();

    component.isExpanded = true;
    fixture.detectChanges();
    
    searchContainer = fixture.debugElement.query(By.css('.search-container'));
    expect(searchContainer).toBeTruthy();
  });

  it('should display overlay when expanded', () => {
    component.isExpanded = false;
    fixture.detectChanges();
    
    let overlay = fixture.debugElement.query(By.css('.search-overlay'));
    expect(overlay).toBeNull();

    component.isExpanded = true;
    fixture.detectChanges();
    
    overlay = fixture.debugElement.query(By.css('.search-overlay'));
    expect(overlay).toBeTruthy();
  });

  it('should show no results message when search has no matches', () => {
    component.isExpanded = true;
    component.searchQuery = 'nonexistent';
    component.onSearchChange();
    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css('.no-results'));
    expect(noResults).toBeTruthy();
    expect(noResults.nativeElement.textContent).toContain('Nenhum resultado encontrado');
  });
});