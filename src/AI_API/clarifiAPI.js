const detectImage = async (imageUrl, apiKey) => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "kashq502",
        app_id: "SmartBrain",
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: raw,
    };

    try {
      const response = await fetch(
        "https://api.clarifai.com/v2/models/general-image-detection/versions/1580bb1932594c93b7e2e04456af7c6f/outputs",
        requestOptions
      );
      //const result = await response.text();
      const result = await response.json();

      const outputs = result.outputs;
      const concepts = outputs[0].data.regions.map((region) => {
        return {
          id: region.id,
          name: region.data.concepts[0].name,
          value: region.data.concepts[0].value,
        };
      });

      console.log("Concepts:", concepts);
      return concepts;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  export default detectImage;
