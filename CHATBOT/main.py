import os
from constants import openai_key
from langchain_openai import ChatOpenAI
import streamlit as st
os.environ["OPENAI_API_KEY"]=openai_key
st.title('langchain demo')
input_text=st.text_input("search the topic you want")
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
if st.button("Go"):
    response = llm.invoke(input_text)
    st.write(response.content)
