import { useEffect, useMemo, useRef, useState } from "react";
import habitsData from "./data/habits.json";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <header className="header">
        <button className="logo" onClick={() => setPage("home")}>
          habitly<span>.</span>
        </button>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button
            onClick={() => {
              if (page === "home") {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              } else {
                setPage("home");
                setTimeout(() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            Features
          </button>
          <button onClick={() => setPage("habits")}>My Habits</button>
        </nav>
        <button className="primary" onClick={() => setPage("habits")}>
          Get Started →
        </button>
      </header>

      {page === "home" ? (
        <main>
          <section className="hero">
            <div className="hero-text">
              <p className="eyebrow">SMALL STEPS. BIG CHANGES.</p>
              <h1>Better habits.<br />A better you.</h1>
              <p className="description">
                Build a routine that feels right for you. Focus on small
                daily actions and celebrate how far you've come.
              </p>
              <button className="primary" onClick={() => setPage("habits")}>
                Start your journey →
              </button>
              <p className="muted">Free to start · Progress at your own pace</p>
            </div>

            <div className="preview">
              <div className="preview-top">
                <div>
                  <p className="muted">YOUR DAILY CHECK-IN</p>
                  <h2>A little progress goes a long way.</h2>
                </div>
                <span className="round-icon">✦</span>
              </div>
              <div className="preview-progress">
                <span>Today's progress</span><strong>75%</strong>
              </div>
              <div className="progress"><div /></div>
              {["Drink more water", "Read for 10 minutes",
                "Take a short walk", "Practice mindfulness"].map((item, i) => (
                  <div className="preview-habit" key={item}>
                    <span className={i < 3 ? "mini-check done" : "mini-check"}>
                      {i < 3 ? "✓" : ""}
                    </span>
                    <span>{item}</span>
                    {i < 3 && <span className="tiny-done">DONE</span>}
                  </div>
                ))}
            </div>
          </section>

          <section className="section" id="features">
            <p className="eyebrow">MADE FOR REAL LIFE</p>
            <h2>Small steps. Meaningful progress.</h2>
            <p className="section-intro">
              You don't need a perfect routine. You just need a place to start.
            </p>
            <div className="cards">
              <article className="card">
                <span className="feature-icon">◎</span>
                <h3>Find your focus</h3>
                <p>Keep your daily habits together in one simple space.</p>
              </article>
              <article className="card">
                <span className="feature-icon">↗</span>
                <h3>See your progress</h3>
                <p>Make each small win visible and keep moving forward.</p>
              </article>
              <article className="card">
                <span className="feature-icon">✳</span>
                <h3>Build consistency</h3>
                <p>Create a routine that works with your life, not against it.</p>
              </article>
            </div>
          </section>

          <section className="section tinted" id="reviews">
            <p className="eyebrow">A LITTLE ENCOURAGEMENT</p>
            <h2>Progress over perfection.</h2>
            <div className="cards">
              <article className="card quote">
                <p>"A simple routine makes my busy days feel more manageable."</p>
                <strong>Alex M.</strong><span> · Student</span>
              </article>
              <article className="card quote">
                <p>"I like being able to see the small things I actually finish."</p>
                <strong>Jamie L.</strong><span> · Designer</span>
              </article>
              <article className="card quote">
                <p>"It reminds me that consistency is built one day at a time."</p>
                <strong>Sam T.</strong><span> · Developer</span>
              </article>
            </div>
            <p className="muted sample-note">
              Sample testimonials for this fictional product.
            </p>
          </section>

          <section className="section" id="pricing">
            <p className="eyebrow">SIMPLE PLANS</p>
            <h2>Start small. Grow from there.</h2>
            <p className="section-intro">Choose a plan that fits your routine.</p>
            <div className="cards">
              <article className="card price-card">
                <h3>Free</h3><h2>₹0</h2>
                <p>For building your first routines.</p>
                <ul><li>Up to 5 habits</li><li>Daily check-ins</li></ul>
                <button className="secondary full" onClick={() => setPage("habits")}>Get started</button>
              </article>
              <article className="card price-card featured-price">
                <span className="plan-label">MOST POPULAR</span>
                <h3>Plus</h3><h2>₹199 <small>/ month</small></h2>
                <p>For your growing routine.</p>
                <ul><li>Unlimited habits</li><li>Progress insights</li></ul>
                <button className="primary full" onClick={() => setPage("habits")}>Explore Plus</button>
              </article>
              <article className="card price-card">
                <h3>Yearly</h3><h2>₹1,499 <small>/ year</small></h2>
                <p>For the long-term planner.</p>
                <ul><li>All Plus features</li><li>Yearly billing</li></ul>
                <button className="secondary full" onClick={() => setPage("habits")}>Get started</button>
              </article>
            </div>
            <p className="muted sample-note">Illustrative plans for this assignment. No payments are collected.</p>
          </section>

          <section className="closing">
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS SMALL</p>
            <h2>One small habit can change your day.</h2>
            <button className="primary" onClick={() => setPage("habits")}>
              Open My Habits →
            </button>
          </section>
        </main>
      ) : (
        <HabitsPage onBack={() => setPage("home")} />
      )}

      <footer>
        <button className="logo footer-logo" onClick={() => setPage("home")}>
          habitly<span>.</span>
        </button>
        <p>Little steps. Lasting change.</p>
        <span>© 2026 Habitly · A habit tracker concept</span>
      </footer>
    </div>
  );
}

function HabitsPage({ onBack }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [frequency, setFrequency] = useState("All");
  const [sort, setSort] = useState("name");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [newCategory, setNewCategory] = useState("Wellness");
  const [newFrequency, setNewFrequency] = useState("Daily");
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");
  const [deleted, setDeleted] = useState(null);
  const [undoMessage, setUndoMessage] = useState("");
  const [demoError, setDemoError] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHabits(habitsData);
      setLoading(false);
    }, 650);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [showForm]);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  }

  function retryLoad() {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setHabits(habitsData);
      setLoading(false);
      notify("Habits loaded successfully");
    }, 500);
  }

  function addHabit(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setFormError("Please enter a habit name.");
      return;
    }
    if (habits.some((habit) => habit.name.toLowerCase() === cleanName.toLowerCase())) {
      setFormError("This habit already exists. Try a different name.");
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: cleanName,
      category: newCategory,
      frequency: newFrequency,
      completed: false
    };

    setHabits((current) => [newHabit, ...current]);
    setName("");
    setFormError("");
    setShowForm(false);
    notify("New habit added!");
  }

  function toggleHabit(id) {
    const selected = habits.find((habit) => habit.id === id);
    const willComplete = !selected.completed;

    setHabits((current) =>
      current.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    notify(willComplete ? "Great job! Habit completed." : "Habit marked as incomplete.");
  }

  function deleteHabit(habit) {
    setHabits((current) => current.filter((item) => item.id !== habit.id));
    setDeleted(habit);
    setUndoMessage(`"${habit.name}" deleted.`);

    setTimeout(() => {
      setUndoMessage("");
      setDeleted(null);
    }, 5000);

    notify("Habit deleted. You can undo this action.");
  }

  function undoDelete() {
    if (!deleted) return;
    setHabits((current) => [deleted, ...current]);
    setDeleted(null);
    setUndoMessage("");
    notify("Habit restored.");
  }

  const categories = ["All", ...new Set(habits.map((habit) => habit.category))];

  const filteredHabits = useMemo(() => {
    let result = habits.filter((habit) => {
      const matchesSearch = habit.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || habit.category === category;
      const matchesStatus = status === "All" ||
        (status === "Completed" && habit.completed) ||
        (status === "Not completed" && !habit.completed);
      const matchesFrequency = frequency === "All" || habit.frequency === frequency;
      return matchesSearch && matchesCategory && matchesStatus && matchesFrequency;
    });

    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "category") result.sort((a, b) => a.category.localeCompare(b.category));
    if (sort === "incomplete") result.sort((a, b) => Number(a.completed) - Number(b.completed));
    return result;
  }, [habits, search, category, status, frequency, sort]);

  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <main className="dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h1>My Habits<span>.</span></h1>
          <p className="muted">Small steps count. Let's make today a good one.</p>
        </div>
        <button className="primary" onClick={() => { setShowForm(!showForm); setFormError(""); }}>
          {showForm ? "Cancel" : "+ Add habit"}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span className="muted">Total habits</span><strong>{habits.length}</strong><span>In your routine</span></div>
        <div className="stat-card"><span className="muted">Completed today</span><strong>{completedCount}</strong><span>One step at a time</span></div>
        <div className="stat-card"><span className="muted">Daily progress</span><strong>{progress}%</strong><div className="progress"><div style={{ width: `${progress}%` }} /></div></div>
      </div>

      {loading && !error && (
        <div className="habit-list" aria-label="Loading habits">
          {[1, 2, 3].map((item) => (
            <div className="skeleton" key={item}>
              <div />
              <div />
              <div />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <form
          ref={formRef}
          className="habit-form"
          onSubmit={addHabit}
          noValidate
        >
          <h2>Add a new habit</h2>
          <label htmlFor="habit-name">Habit name</label>
          <input id="habit-name" value={name} onChange={(e) => { setName(e.target.value); setFormError(""); }} placeholder="e.g. Go for a walk" maxLength={60} />
          <div className="form-row">
            <div>
              <label htmlFor="habit-category">Category</label>
              <select id="habit-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option>Wellness</option><option>Learning</option><option>Fitness</option><option>Productivity</option><option>Mindfulness</option>
              </select>
            </div>
            <div>
              <label htmlFor="habit-frequency">Frequency</label>
              <select id="habit-frequency" value={newFrequency} onChange={(e) => setNewFrequency(e.target.value)}>
                <option>Daily</option><option>Weekly</option>
              </select>
            </div>
          </div>
          {formError && <p className="form-error" role="alert">{formError}</p>}
          <button className="primary" type="submit">Save habit</button>
        </form>
      )}

      <div className="filter-panel">
        <div className="search-box">
          <label htmlFor="habit-search">Search habits</label>
          <input id="habit-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name..." />
        </div>
        <div><label htmlFor="category-filter">Category</label>
          <select id="category-filter" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div><label htmlFor="status-filter">Status</label>
          <select id="status-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option><option>Completed</option><option>Not completed</option>
          </select>
        </div>
        <div><label htmlFor="frequency-filter">Frequency</label>
          <select id="frequency-filter" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option>All</option><option>Daily</option><option>Weekly</option>
          </select>
        </div>
        <div><label htmlFor="sort-habits">Sort by</label>
          <select id="sort-habits" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name A–Z</option><option value="category">Category</option><option value="incomplete">Incomplete first</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="state-card">
          <span className="state-icon">!</span><h2>We couldn't load your habits</h2>
          <p>Please try again. Your routine will be waiting.</p>
          <button className="primary" onClick={retryLoad}>Try again</button>
        </div>
      ) : loading ? null : habits.length === 0 ? (

        <div className="state-card">
          <span className="state-icon">✳</span><h2>Your journey starts here</h2>
          <p>You haven't added any habits yet. Start with one small step.</p>
          <button className="primary" onClick={() => setShowForm(true)}>+ Create your first habit</button>
        </div>
      ) : filteredHabits.length === 0 ? (
        <div className="state-card">
          <span className="state-icon">⌕</span><h2>No habits found</h2>
          <p>Try a different search or change your filters.</p>
          <button className="secondary" onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); setFrequency("All"); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="habit-list">
          <div className="list-heading"><h2>Your routine</h2><span>{filteredHabits.length} habits</span></div>
          {filteredHabits.map((habit) => (
            <article className={`habit-card ${habit.completed ? "completed" : ""}`} key={habit.id}>
              <button className={`complete-button ${habit.completed ? "checked" : ""}`} onClick={() => toggleHabit(habit.id)} aria-label={habit.completed ? `Mark ${habit.name} incomplete` : `Mark ${habit.name} complete`}>
                {habit.completed ? "✓" : ""}
              </button>
              <div className="habit-info">
                <h3>{habit.name}</h3>
                <p>{habit.category} <span>·</span> {habit.frequency}</p>
              </div>
              <span className={`status-pill ${habit.completed ? "pill-done" : ""}`}>
                {habit.completed ? "Completed" : "In progress"}
              </span>
              <button className="delete-button" onClick={() => deleteHabit(habit)} aria-label={`Delete ${habit.name}`} title="Delete habit">×</button>
            </article>
          ))}
        </div>
      )}

      <div className="demo-tools">
        <button className="text-button" onClick={() => { setError(true); setLoading(false); }}>
          Test error state
        </button>
        <span>Demo controls for reviewing all assignment states</span>
      </div>

      <div className="back-home-bottom">
        <button className="back-link" onClick={onBack}>
          ← Back to home
        </button>
      </div>

      {undoMessage && deleted && (
        <div className="undo-bar" role="status">
          <span>{undoMessage}</span>
          <button onClick={undoDelete}>Undo</button>
          <button aria-label="Dismiss undo message" onClick={() => { setDeleted(null); setUndoMessage(""); }}>×</button>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

export default App;
