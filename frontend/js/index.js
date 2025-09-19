const API_POLLS = 'http://localhost:3000/polls';
const API_VOTES = 'http://localhost:3000/votes';

async function vote(optionId) {
  try {
    const res = await fetch(API_VOTES, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ optionId })
  });

  if (!res.ok) {
    const errData = await res.json();
    alert(errData.error);
    return
  }

  const voteCountEl = document.querySelector(`#option-${optionId}-votes`);
  if (voteCountEl) {
    voteCountEl.textContent = parseInt(voteCountEl.textContent) + 1;
  }

  const btn = document.querySelector(`button[data-option-id="${optionId}"]`);
  if (btn) {
    btn.textContent = 'Votado!';
    btn.disabled = true;
  }
  } catch (error) {
    console.error('Erro ao votar:', error);
  }
}

async function fetchPolls() {
  try {
    const res = await fetch(API_POLLS);
    const polls = await res.json();

    const list = document.getElementById('poll-list');
    list.innerHTML = '';

    polls.forEach(poll => {
      const li = document.createElement('li');

      poll.Options.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0));

      li.innerHTML = `
        <strong>${poll.title}</strong>
        <button class="delete-btn">Apagar enquete</button>
        -${poll.description || 'Sem descrição'}
        <ul>
          ${poll.Options.map(option => `
            <li>
              ${option.title} - <span id="option-${option.id}-votes">${option.voteCount || 0}</span> votes
              <button data-option-id="${option.id}">Votar</button>
            </li>
          `).join('')}
        </ul>
      `;

      li.querySelector(".delete-btn").addEventListener("click", () => deletePoll(poll.id));

      li.querySelectorAll('button[data-option-id]').forEach(btn => {
        const optionId = btn.dataset.optionId;
        const option = poll.Options.find(o => o.id == optionId);
        const now = new Date();
        const start = new Date(poll.startDate);
        const end = new Date(poll.endDate);

        if (now < start || now > end) {
          btn.disabled = true;
          btn.textContent = 'Votação encerrada';
        }

        btn.addEventListener('click', () => vote(optionId));
      })

      list.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao buscar enquetes:', error);
  }
}

async function deletePoll(pollId) {
  if (!confirm('Tem certeza que deseja apagar esta enquete?')) return;

  try {
    const res = await fetch(`http://localhost:3000/polls/${pollId}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const errData = await res.json();
      alert(errData.error);
      return
    }

    fetchPolls();
  } catch (error) {
    console.error("Erro ao apagar enquete:", error);
  }
}


fetchPolls();
