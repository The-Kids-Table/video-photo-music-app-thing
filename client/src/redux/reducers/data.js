const initialState = {
  currentProject: {
    owner: {
      name: 'Ian Hubert',
      avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
      jobTitle: 'Visual Effects Artist'
    },
    contributors: [
      {
        name: 'Derek de Lint',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/derek.jpg',
        jobTitle: 'Actor - Thom'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
    ],
    project: {
      name: 'Tears of Steel',
      description: 'Thom just wanted to be an astronaut. His girlfriend Celia just wanted to create robots - and for him to not be freaked out by her cyborg hand.',
      tagline: 'This is the tagline.',
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      projectComponents: [{
        name: 'Fight Scene',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Fight+Scene.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'End Credits',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/04+End+credits.mp3',
        description: 'This is the final soundtrack for the end credits.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'The Battle',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/03+The+battle.mp3',
        description: 'This is the final soundtrack for the fight scene that ensues as we reach the climax.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Script',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-text-files/Script.txt',
        description: null,
        type: 'text',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'The Dome',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/02+The+dome.mp3',
        description: 'This is the final soundtrack for the scenes throughout the establishing shots and early parts of the movie.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Concept Poster',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Concept+Poster.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Final Poster',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/final+Poster.png',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: '40 years later',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/01+40+years+later.mp3',
        description: 'This is the final soundtrack for the openning scene of the movie.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Robo Arm Initial Render',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm+2.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Robo Arm Lighting Test',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Robo Arm Final',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm+3.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }]
    },
  },
  searchResults: [
    {
      contentType: 'project',
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'text',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'component',
      name: 'Some Cool component',
      resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
      description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
      type: 'video',
      isDownloadable: false,
      author: {  
        name: 'John Doe',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Visual Effects Artist'
      }
    },
    {
      contentType: 'component',
      name: 'Some Cool component',
      resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
      description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
      type: 'audio',
      isDownloadable: false,
      author: {  
        name: 'John Doe',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Visual Effects Artist'
      }
    },
    {
      contentType: 'component',
      name: 'Some Cool component',
      resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
      description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
      type: 'text',
      isDownloadable: false,
      author: {  
        name: 'John Doe',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Visual Effects Artist'
      }
    },
    {
      contentType: 'component',
      name: 'Some Cool component',
      resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
      description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
      type: 'photo',
      isDownloadable: false,
      author: {  
        name: 'John Doe',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Visual Effects Artist'
      }
    },
    {
      contentType: 'user',
      name: 'John Doe',
      avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      jobTitle: 'Visual Effects Artist'
    }
  ]
};

const data = (state = initialState, action) => {



  return state;
};

export default data;