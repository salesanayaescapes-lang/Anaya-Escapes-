export function handleActiveTab() {
    const tabs = document.querySelectorAll('.package-detail-tabs .tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
        });
    });
}