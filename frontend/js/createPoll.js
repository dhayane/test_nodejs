const API_POLLS = "http://localhost:3000/polls";
const API_OPTIONS = "http://localhost:3000/options";

const form = document.getElementById("create-poll-form");
const messageEl = document.getElementById("message");
const optionsContainer = document.getElementById("options-container");
const addOptionBtn = document.getElementById("add-option");

addOptionBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "option-input";
  input.placeholder = `Opção ${optionsContainer.querySelectorAll(".option-input").length + 1}`;
  input.required = true;

  optionsContainer.appendChild(document.createElement("br"));
  optionsContainer.appendChild(input);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const optionsInputs = [...document.querySelectorAll(".option-input")];

  if (!title) {
    return (messageEl.textContent = "O título é um campo obrigatório!");
  }

  if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
    return (messageEl.textContent = "Datas inválidas!");
  }

  const options = optionsInputs.map((inp) => inp.value.trim()).filter((v) => v);

  if (options.length < 3) {
    return (messageEl.textContent = "A enquete precisa de pelo menos 3 opções!");
  }

  try {
    const pollRes = await fetch(API_POLLS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, startDate, endDate }),
    });

    if (!pollRes.ok) throw new Error("Erro ao criar enquete");

    const poll = await pollRes.json();

    for (const opt of options) {
      await fetch(API_OPTIONS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: opt, pollId: poll.id }),
      });
    }

    messageEl.textContent = "Enquete criada com sucesso!";

    form.reset();

    optionsContainer.innerHTML = `
      <input type="text" class="option-input" placeholder="Opção 1" required>
      <input type="text" class="option-input" placeholder="Opção 2" required>
      <input type="text" class="option-input" placeholder="Opção 3" required>
    `;
  } catch (error) {
    console.error(error);
    messageEl.textContent = "Erro ao criar a enquete.";
  }
});
