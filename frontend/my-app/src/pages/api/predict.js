// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// expect a POST request with a JSON body
// the body should contain a table array
// the table array should be a 1D array of 784 booleans

const predict = async (table) => {
  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({table}),
  });
  const data = await res.json();
  return data;
}

export default async function handler(req, res) {
  const { table } = req.body;
  // const filterTable = [];
  if(!table) {
    res.status(400).json({ error: "Missing table" });
    return;
  }
  if(!Array.isArray(table)) {
    res.status(400).json({ error: "Table should be an array" });
    return;
  }
  if(table.length !== 784) {
    res.status(400).json({ error: "Table should have 784 elements" });
    return;
  }
  for(let i = 0; i < 784; i++) {
    if(typeof table[i] !== "number") {
      res.status(400).json({ error: "Table should be an array of booleans" });
      return;
    }
    // filterTable.push(table[i] ? 0.8 : 0);
  }
  const prediction = await predict(table);
  res.status(200).json(prediction);
}
