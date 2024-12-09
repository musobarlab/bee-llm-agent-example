# 🐝 Bee Agent Framework Starter

This starter template lets you quickly start working with the [Bee Agent Framework](https://github.com/i-am-bee/bee-agent-framework) in a second.

📚 See the [documentation](https://i-am-bee.github.io/bee-agent-framework/) to learn more.


## 📦 Requirements

- JavaScript runtime [NodeJS > 18](https://nodejs.org/) (ideally installed via [nvm](https://github.com/nvm-sh/nvm)).
- LLM Provider either external (OpenAI, Groq, ...) or local [ollama](https://ollama.com).

## 🛠️ Getting started

## Start Local Ollama with Llama3.2 (https://ollama.com/library/llama3.2)
1. Download Ollama local https://github.com/ollama/ollama/blob/main/docs/linux.md
```shell
curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz
tar -xzf ollama-linux-amd64.tgz
```

2. Pull `Llama3.2` Model
```shell
./bin/ollama pull llama3.2
```

3. Start `Ollama`
```shell
./bin/ollama serve
```

## Run Agent Example
1. Install dependencies
```shell
npm install
```

2. Build project
```shell
npm run build
```

1. Run agent with a custom prompt, simply do this
```shell
node dist/agent.js <<< 'find facebook page openai'
```


