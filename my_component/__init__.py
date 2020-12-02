import os
import streamlit.components.v1 as components

img_list = ['image 1', 'image 2']

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)


def my_component(key=None):
    component_value = _component_func(key=key, default=0)
    return component_value


if not _RELEASE:
    clicked_coords = img_list
    import streamlit as st
    st.subheader("Leaflet - return coords on click and bbox on moveend")
    clicked_coords = my_component()
    st.markdown(clicked_coords)
    total_images = st.sidebar.selectbox(label="Image à inférer", options=clicked_coords.split(','))
