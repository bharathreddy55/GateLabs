// Toast Notification Utility

export function showToast(message, type = 'info', duration = 3000) {
  // Find or create toast container
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-10 opacity-0 page-enter';
  
  // Design configuration based on type
  let iconClass = 'fa-circle-info';
  let borderClass = 'border-blue-100 bg-white text-blue-600 dark:bg-slate-800 dark:border-slate-700 dark:text-blue-400';
  
  if (type === 'success') {
    iconClass = 'fa-circle-check';
    borderClass = 'border-emerald-100 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400';
  } else if (type === 'error') {
    iconClass = 'fa-circle-exclamation';
    borderClass = 'border-rose-100 bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-400';
  } else if (type === 'warning') {
    iconClass = 'fa-triangle-exclamation';
    borderClass = 'border-amber-100 bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400';
  }

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg"></i>
    <span class="flex-1">${message}</span>
    <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  
  toast.className = `${toast.className} ${borderClass}`;
  container.appendChild(toast);

  // Trigger entrance animation
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  // Automatically remove toast
  setTimeout(() => {
    toast.classList.add('opacity-0', 'scale-90');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
