//
//  WebContentViewController.h
//  Transform
//
//  Created by Kevin Liang on 5/31/14.
//  Copyright (c) 2014 Code4Kingdom. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface WebContentViewController : UIViewController <UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *webView;

- (void) loadCurrentLocalUrl:(NSString *)url;
- (void) loadJavascript:(NSString *)url;

@end
