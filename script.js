const ctx = document.getElementById('grafikTugas3').getContext('2d');

// Track berdasarkan Tugas 1 kamu
const trackRequests = [
    1600, 1050, 1775, 1950, 10, 825, 75, 1300, 1450, 600, 900,
    1600, 1050, 30, 1900, 2004, 700, 1300, 55, 425, 89, 700, 1600, 200
];

const headStart = 1234;

// Fungsi membantu
function fcfs(trackList, start) {
    return [start, ...trackList];
}

function sstf(trackList, start) {
    const visited = [];
    let current = start;
    let pending = [...trackList];

    while (pending.length > 0) {
        let closestIdx = 0;
        let minDistance = Math.abs(pending[0] - current);
        for (let i = 1; i < pending.length; i++) {
            if (Math.abs(pending[i] - current) < minDistance) {
                closestIdx = i;
                minDistance = Math.abs(pending[i] - current);
            }
        }
        current = pending.splice(closestIdx, 1)[0];
        visited.push(current);
    }
    return [start, ...visited];
}

function scan(trackList, start, diskSize = 2000) {
    const allTracks = [...trackList, start].sort((a, b) => a - b);
    const startIdx = allTracks.indexOf(start);

    const ascending = allTracks.slice(startIdx);
    const descending = allTracks.slice(0, startIdx).reverse();
    return [...ascending, ...descending];
}

function look(trackList, start) {
    const allTracks = [...trackList, start].sort((a, b) => a - b);
    const startIdx = allTracks.indexOf(start);

    const ascending = allTracks.slice(startIdx);
    const descending = allTracks.slice(0, startIdx).reverse();
    return [...ascending, ...descending];
}

function cscan(trackList, start, diskSize = 2000) {
    const allTracks = [...trackList, start].sort((a, b) => a - b);
    const startIdx = allTracks.indexOf(start);

    const ascending = allTracks.slice(startIdx);
    const wrapAround = allTracks.slice(0, startIdx);
    return [...ascending, diskSize, 0, ...wrapAround];
}

function clook(trackList, start) {
    const allTracks = [...trackList, start].sort((a, b) => a - b);
    const startIdx = allTracks.indexOf(start);

    const ascending = allTracks.slice(startIdx);
    const wrapAround = allTracks.slice(0, startIdx);
    return [...ascending, ...wrapAround];
}

// Mengisi data dataset grafik
new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 25 }, (_, i) => `Langkah ${i + 1}`),
        datasets: [
            {
                label: 'PTPD (FCFS)',
                data: fcfs(trackRequests, headStart),
                borderColor: 'orange',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            },
            {
                label: 'SSTF',
                data: sstf(trackRequests, headStart),
                borderColor: 'red',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            },
            {
                label: 'SCAN (Elevator)',
                data: scan(trackRequests, headStart),
                borderColor: 'magenta',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            },
            {
                label: 'LOOK',
                data: look(trackRequests, headStart),
                borderColor: 'purple',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            },
            {
                label: 'C-SCAN',
                data: cscan(trackRequests, headStart),
                borderColor: 'blue',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            },
            {
                label: 'C-LOOK',
                data: clook(trackRequests, headStart),
                borderColor: 'cyan',
                fill: false,
                tension: 0.1,
                pointRadius: 3
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Grafik Perjalanan Head Disk Scheduling'
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Posisi Track'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Langkah Ke-'
                }
            }
        }
    }
});
