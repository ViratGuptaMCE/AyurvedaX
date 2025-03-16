import os
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
import google.generativeai as genai

# 1️⃣ Load environment variables
load_dotenv('api.env')
api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("🚨 Missing GOOGLE_API_KEY in api.env file")

# 2️⃣ Configure Google AI
genai.configure(api_key=api_key)

# 3️⃣ Verify available models
try:
    print("🔍 Checking available models...")
    available_models = [m.name for m in genai.list_models()]
    required_models = [
        "models/embedding-001",
        "models/gemini-1.5-pro-latest"
    ]
    
    for model in required_models:
        if model not in available_models:
            raise ValueError(f"❌ Required model {model} not available")
    
    print("✅ All required models available")
except Exception as e:
    print(f"❌ Model verification failed: {e}")
    exit()

# 4️⃣ PDF Processing Functions
def extract_text_from_pdf(pdf_path):
    try:
        print(f"📄 Processing PDF: {pdf_path}")
        with open(pdf_path, 'rb') as file:
            pdf_reader = PdfReader(file)
            text = "\n".join(
                page.extract_text() 
                for page in pdf_reader.pages 
                if page.extract_text()
            )
            if not text:
                raise ValueError("No text extracted from PDF")
            return text
    except Exception as e:
        print(f"❌ PDF Error: {e}")
        exit()

# 5️⃣ Document Processing
def process_document(pdf_path):
    raw_text = extract_text_from_pdf(pdf_path)
    
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    return text_splitter.split_text(raw_text)

# 6️⃣ Initialize AI Components
def initialize_components():
    try:
        print("🤖 Initializing AI models...")
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key
        )
        
        llm = ChatGoogleGenerativeAI(
            model="models/gemini-1.5-pro-latest",
            google_api_key=api_key,
            temperature=0.3,
            convert_system_message_to_human=True
        )
        
        return embeddings, llm
    except Exception as e:
        print(f"❌ AI Initialization Error: {e}")
        exit()

# 7️⃣ Main Processing
def main():
    # Process PDF
    texts = process_document("TechAdv.pdf")
    
    # Initialize AI models
    embeddings, llm = initialize_components()
    
    # Create vector store
    print("📚 Creating document vectors...")
    vector_store = FAISS.from_texts(texts, embeddings)
    
    # Define prompt template
    prompt_template = PromptTemplate.from_template(
        "Context from document:\n{context}\n\n"
        "Question: {question}\n"
        "Answer in clear, professional language:"
    )
    
    # Q&A Function
    # ... (previous code remains the same)

    # Q&A Function
    def ask_question(query):
        try:
            docs = vector_store.similarity_search(query, k=3)
            context = "\n\n".join(d.page_content for d in docs)
            
            # Fix: Add closing parenthesis for invoke()
            response = llm.invoke(
                prompt_template.format(context=context, question=query)
            )
            
            return response.content
        except Exception as e:
            return f"⚠ Error: {str(e)}"

# ... (rest of the code remains the same)
    
    # Interactive session
    print("\n💬 Document QA System Ready (Type 'exit' to quit)")
    while True:
        query = input("\n📝 Your question: ")
        if query.lower() in ['exit', 'quit']:
            break
        if not query.strip():
            continue
            
        print("\n🔍 Searching document...")
        answer = ask_question(query)
        print(f"\n📢 Answer:\n{answer}")

if name == "main":
    main()