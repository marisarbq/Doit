#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

out vec4 myColor;

void main()
{
    myColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);
} 