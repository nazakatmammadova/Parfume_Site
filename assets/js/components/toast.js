// Small notification in the bottom-right corner (Bootstrap Toast).

let stack;

export function showToast(html) {
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("aria-live", "polite");
    document.body.append(stack);
  }

  const toast = document.createElement("div");
  toast.className = "toast align-items-center";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body"><i class="bi bi-check-circle-fill me-2"></i>${html}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Bağla"></button>
    </div>`;
  stack.append(toast);

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
  window.bootstrap.Toast.getOrCreateInstance(toast, { delay: 2500 }).show();
}
