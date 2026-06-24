const Progress = {
  STORAGE_KEY: 'mimo-tutorial-progress',
  
  getAll() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },
  
  save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },
  
  isCompleted(chapterId) {
    const progress = this.getAll();
    return progress[chapterId] === true;
  },
  
  complete(chapterId) {
    const progress = this.getAll();
    progress[chapterId] = true;
    this.save(progress);
    this.updateUI();
  },
  
  uncomplete(chapterId) {
    const progress = this.getAll();
    delete progress[chapterId];
    this.save(progress);
    this.updateUI();
  },
  
  toggle(chapterId) {
    if (this.isCompleted(chapterId)) {
      this.uncomplete(chapterId);
    } else {
      this.complete(chapterId);
    }
  },
  
  getCompletionRate() {
    const progress = this.getAll();
    const total = this.getTotalChapters();
    const completed = Object.keys(progress).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },
  
  getTotalChapters() {
    return document.querySelectorAll('[data-chapter]').length || 18;
  },
  
  updateUI() {
    const rate = this.getCompletionRate();
    const fill = document.querySelector('.progress-fill');
    if (fill) {
      fill.style.width = rate + '%';
    }
    
    document.querySelectorAll('[data-chapter]').forEach(el => {
      const id = el.dataset.chapter;
      if (this.isCompleted(id)) {
        el.classList.add('completed');
      } else {
        el.classList.remove('completed');
      }
    });
    
    const stat = document.getElementById('completion-stat');
    if (stat) {
      stat.textContent = `完成 ${rate}%`;
    }
  },
  
  getNextChapter() {
    const chapters = Array.from(document.querySelectorAll('[data-chapter]'));
    for (const ch of chapters) {
      if (!this.isCompleted(ch.dataset.chapter)) {
        return ch.querySelector('a');
      }
    }
    return null;
  }
};

document.addEventListener('DOMContentLoaded', () => Progress.updateUI());
