# AI MCP Suggester

An advanced Next.js application that implements an intelligent TODO management system using the **Model Context Protocol (MCP)** to provide AI-powered suggestions and intelligent task management.

## 🚀 Key Features

- **Dual Management System**: Implementation of both manual and MCP-powered systems for feature comparison
- **MCP Integration**: Uses Model Context Protocol for intelligent client-server communications
- **Redis Storage**: Data persistence with Redis for optimal performance
- **Modern UI**: Responsive design with Tailwind CSS and smooth animations
- **TypeScript**: Strong typing for enhanced code reliability
- **Modular Architecture**: Code organization with Atomic Design pattern (atoms, molecules, organisms)

## 🏗️ Architecture

The project is structured following Next.js 15 best practices with App Router:

- **Frontend**: React 19 with modular components and context API
- **Backend**: Next.js API Routes with MCP integration
- **Database**: Redis for persistent storage
- **Styling**: Tailwind CSS 4 with consistent design system
- **Type Safety**: TypeScript with Zod for schema validation

## 🛠️ Technologies Used

- **Framework**: Next.js 15.5.3 with Turbopack
- **Runtime**: React 19.1.0
- **Database**: Redis with Upstash client
- **Styling**: Tailwind CSS 4
- **Type Safety**: TypeScript + Zod
- **MCP**: Model Context Protocol SDK
- **Testing**: Jest with ts-jest

## 🚦 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/gianvsk/ai-mcp-suggester.git
cd ai-mcp-suggester
npm install
```

Configure environment variables (create a `.env.local` file):

```env
# Redis Configuration
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── [transport]/       # Dynamic routing for MCP
│   ├── actions/           # Server actions
│   └── hooks/            # Custom hooks
├── components/           # React components
│   ├── atoms/           # Base components
│   ├── molecules/       # Composed components
│   └── organisms/       # Complex components
└── lib/                 # Utilities and configurations
    ├── context/         # React Context
    ├── plugin/          # Redis plugin
    └── schemas/         # Zod schemas
```

## 🔧 MCP Features

The project implements an MCP server that provides:

- **Intelligent TODO Management**: CRUD operations with AI suggestions
- **Real-time Synchronization**: Real-time updates between clients
- **Redis Persistence**: Efficient and fast storage
- **RESTful API**: Standardized endpoints for operations

### Available MCP Endpoints

- `toDoGenerator`: Intelligent TODO creation
- `getAllToDos`: Retrieve all TODOs
- `removeToDo`: Selective removal
- `toggleToDo`: Toggle completion status

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Automatic deployment on every push

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more details.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs) - Next.js documentation
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP specifications
- [Tailwind CSS](https://tailwindcss.com/docs) - Tailwind documentation
- [Redis Documentation](https://redis.io/docs) - Redis documentation

## 📧 Contact

For questions or support, contact me directly on Github

---

Developed with ❤️ using Next.js and Model Context Protocol
