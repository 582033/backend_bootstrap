<div class="trips-wrapper trips-wrapper-visible" id="js-trip">
	<div class="trip-show-cover" id="cover">
	</div>
	<div class="cover-photo" id="cover-photo">
		<div class="load-ico" style="display: none;">
			<i>
			</i>
		</div>
	</div>
	<article class="viewer" id="viewer" style="left: 100%;">
		<div class="cover-thumb" id="open-trips">
			<div class="photo-count">
				探索目的地-{$city.city_name}
				<p>
					|
				</p>
				{$city.name}
			</div>
		</div>
		<div class="position">
			<div class="trip-title" id="back-cover">
				<div class="inner clearfix">
					<h1>
						退出探索
					</h1>
				</div>
			</div>
		</div>
		<div class="viewport-wrapper" style="height: 923px; top: 0px;">
			<div class="viewport" id="viewport" style="height: 923px;">
				<div class="slider" id="slider" style="width: 22080px;">
					{foreach $dreaming.items as $note}
					{if $note.type == 'text'}
					<div class="note text text-full" data-group="{$note.group}" data-layout="{$note.layout}" data-type="{$note.type}" id="{$note.id}">
						<div class="note-content">
							<div class="text-wrapper" style="overflow: hidden;">
								<div class="text-quot-r scroller clearfix" style="position: relative; top: 0px;">
									<div class="text-content">
										<p>
											{$note.description|mbtruncate:280}
										</p>
									</div>
								</div>
								<div class="scrollbar scrollbar-v" unselectable="on" style="display: none; height: 853px;">
									<div class="track" unselectable="on">
									</div>
									<div class="thumb" unselectable="on" style="height: 853px;">
									</div>
								</div>
							</div>
						</div>
						<div class="note-footer">
							<div class="action">
								<span class="comment">
									<i class="ico">
									</i>
									<span>
										0
									</span>
								</span>
								<span class="like">
									<i class="ico">
									</i>
									<span>
										0
									</span>
								</span>
							</div>
						</div>
					</div>
					{else}
					<div class="note" data-group="{$note.group}" data-layout="{$note.layout}" data-type="{$note.type}" id="{$note.id}">
						<div class="note-content">
							<figure class="">
								<img class="photo" src="{$note.photo.src}" />
								<figcaption class="caption">
									<p>
										{$note.description}
									</p>
								</figcaption>
							</figure>
						</div>
						<div class="note-footer">
							<div class="action">
								<span class="comment">
									<i class="ico">
									</i>
									<span>
										0
									</span>
								</span>
								<span class="like">
									<i class="ico">
									</i>
									<span>
										0
									</span>
								</span>
							</div>
						</div>
					</div>
					{/if}
					{/foreach}

				<div class="spacer" id="dragdrop-spacer">
				</div>
				<div class="spacer-hor" id="dragdrop-spacer-hor">
				</div>
			</div>
			<div class="shadow-h-t">
			</div>
			<div class="shadow-h-b">
			</div>
		</div>
		<div class="cloner" id="dragdrop-box">
			<div class="cloner-content">
			</div>
			<div class="ico-layer">
				<div class="ico">
				</div>
			</div>
		</div>
		<div class="scroll-left" id="scroll-left">
		</div>
		<div class="scroll-right" id="scroll-right">
		</div>
		</div>
	</article>
</div>
<div id="hider" style="position:absolute;left:-9999px;top:-9999px;"></div>
<script>
	_G_trip_front_cover_photo = '{$city.cover}';	
	_G_trip_id = '';	
	_G_trip_collection = new tripshow.TripsCollection({$dreaming.items_json},
	{
	parse:true
	});
	tripShowInit();	
</script>
<!-- trips-wrapper end -->
